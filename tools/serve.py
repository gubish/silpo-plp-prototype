"""Локальний сервер демо без кешу: браузер завжди бере свіжі файли після правок.
Запуск із папки проєкту: python3 tools/serve.py [порт]  (за замовчуванням 5174)"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 5174
print(f'http://localhost:{port}')
ThreadingHTTPServer(('', port), NoCacheHandler).serve_forever()
