#!/usr/bin/env python3
"""Executa o backend com geração automática de relatório de requisições."""

from __future__ import annotations

import json
import signal
import subprocess
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

PROJECT_ROOT = Path(__file__).resolve().parents[1]
LOG_DIR = PROJECT_ROOT / "logs"
LOG_DIR.mkdir(exist_ok=True)


def main() -> int:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    log_file = LOG_DIR / f"backend-{timestamp}.log"
    report_file = LOG_DIR / f"backend-{timestamp}-summary.txt"

    cmd = ["mvn", "-pl", "backend", "spring-boot:run"]
    print(f"Iniciando backend com comando: {' '.join(cmd)}")
    print(f"Logs completos serão salvos em: {log_file}")

    process = subprocess.Popen(
        cmd,
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True,
    )

    if process.stdout is None:
        raise RuntimeError("Não foi possível capturar a saída do processo do backend")

    def _terminate(signum, frame):  # type: ignore[override]
        if process.poll() is None:
            print("\nSolicitando parada do backend...")
            process.terminate()

    signal.signal(signal.SIGINT, _terminate)
    signal.signal(signal.SIGTERM, _terminate)

    with log_file.open("w", encoding="utf-8") as log_handle:
        try:
            for line in iter(process.stdout.readline, ""):
                print(line, end="")
                log_handle.write(line)
        except KeyboardInterrupt:
            _terminate(signal.SIGINT, None)
        finally:
            process.wait()
            if process.returncode not in (0, None):
                print(f"Processo finalizado com código {process.returncode}")

    generate_report(log_file, report_file)
    print(f"Relatório resumido salvo em: {report_file}")
    return process.returncode or 0


def generate_report(log_path: Path, report_path: Path) -> None:
    pattern = "HTTP "
    method_counter: Counter[str] = Counter()
    status_counter: Counter[str] = Counter()
    family_counter: Counter[str] = Counter()
    endpoint_counter: Counter[str] = Counter()
    durations: List[Tuple[int, str, str, str]] = []
    errors: List[str] = []

    with log_path.open(encoding="utf-8") as log_handle:
        for raw_line in log_handle:
            line = raw_line.strip()
            if " ERROR " in raw_line:
                errors.append(line)
            if pattern not in raw_line:
                continue
            payload = extract_payload(raw_line)
            if payload is None:
                continue
            method = payload.get("method", "UNKNOWN")
            path = payload.get("path", "-")
            status_raw = payload.get("status", 0)
            status = str(status_raw)
            try:
                status_code = int(status_raw)
            except (TypeError, ValueError):
                status_code = None
            duration = payload.get("durationMs")

            method_counter[method] += 1
            status_counter[status] += 1
            family = f"{status_code // 100}xx" if status_code is not None and status_code >= 100 else "desconhecido"
            family_counter[family] += 1
            endpoint_counter[path] += 1
            if isinstance(duration, (int, float)):
                durations.append((int(duration), method, path, status))

    total_requests = sum(method_counter.values())

    with report_path.open("w", encoding="utf-8") as report:
        report.write("Resumo de requisições HTTP\n")
        report.write("=" * 30 + "\n\n")
        report.write(f"Arquivo de log: {log_path}\n")
        report.write(f"Total de requisições: {total_requests}\n\n")

        report.write("Por método:\n")
        for method, count in method_counter.most_common():
            report.write(f"  - {method}: {count}\n")
        report.write("\n")

        report.write("Por família de status:\n")
        for family, count in family_counter.most_common():
            report.write(f"  - {family}: {count}\n")
        report.write("\n")

        report.write("Status detalhados:\n")
        for status, count in status_counter.most_common():
            report.write(f"  - {status}: {count}\n")
        report.write("\n")

        report.write("Endpoints mais acessados:\n")
        for path, count in endpoint_counter.most_common(10):
            report.write(f"  - {path}: {count}\n")
        report.write("\n")

        if durations:
            average = sum(d for d, *_ in durations) / len(durations)
            slowest = sorted(durations, key=lambda item: item[0], reverse=True)[:5]
            report.write(f"Tempo médio: {average:.2f} ms\n")
            report.write("Top 5 requisições mais lentas:\n")
            for duration, method, path, status in slowest:
                report.write(f"  - {method} {path} ({status}) -> {duration} ms\n")
            report.write("\n")

        if errors:
            report.write("Últimas mensagens de erro:\n")
            for entry in errors[-20:]:
                report.write(f"  - {entry}\n")
            report.write("\n")

        report.write("Fim do relatório.\n")


def extract_payload(line: str) -> Dict[str, object] | None:
    try:
        _, json_part = line.split("HTTP ", 1)
        json_part = json_part.strip()
        return json.loads(json_part)
    except (ValueError, json.JSONDecodeError):
        return None


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("Execução interrompida pelo usuário.")
        sys.exit(130)
