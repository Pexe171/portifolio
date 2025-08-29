export const linguagens = [
  {
    nome: "JavaScript",
    porcentagem: 85,
    snippets: [
      `async function fetchUser(id) {
  const res = await fetch('/api/user/' + id);
  if (!res.ok) throw new Error('Erro');
  return await res.json();
}`,
      `import React, { useState } from 'react';
function Toggle() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)}>{on ? 'Ligado' : 'Desligado'}</button>;
}`,
      `import express from 'express';
import helmet from 'helmet';
const app = express();
app.use(helmet());
app.listen(3000);`,
    ],
  },
  {
    nome: "Python",
    porcentagem: 80,
    snippets: [
      `import hashlib

def hash_password(pw):
  return hashlib.sha256(pw.encode()).hexdigest()`,
      `from flask import Flask
app = Flask(__name__)

@app.get('/ping')
def ping():
  return {'status': 'ok'}`,
      `import json

with open('config.json') as f:
  config = json.load(f)
print(config['debug'])`,
    ],
  },
  {
    nome: "Java",
    porcentagem: 70,
    snippets: [
      `try (Connection c = ds.getConnection();
     PreparedStatement ps = c.prepareStatement(sql)) {
  ps.setString(1, user);
}`,
      `public record User(String name, int age) {}`,
      `import org.springframework.web.bind.annotation.*;

@RestController
class Ping {
  @GetMapping("/ping")
  String ping() { return "ok"; }
}`,
    ],
  },
  {
    nome: "HTML/CSS",
    porcentagem: 90,
    snippets: [
      `<div class="card">
  <h2>Login</h2>
  <input type="password" required>
</div>
<style>
.card{max-width:300px;margin:auto;padding:1rem;border-radius:8px;background:#1f2937;}
</style>`,
      `<div class="loader"></div>
<style>
.loader{width:40px;height:40px;border:4px solid #fff;border-top-color:#6366f1;border-radius:50%;animation:spin 1s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
</style>`,
      `<div class="grid">
  <div>A</div><div>B</div><div>C</div>
</div>
<style>
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:8px;}
</style>`,
    ],
  },
];

export const tecnologias = ["React", "Node.js", "Tailwind", "Git", "Docker"];

