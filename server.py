import http.server
import socketserver
import requests
import random

PORT = 8000
EDAMAM_APP_ID = '27e6812e'
EDAMAM_API_KEY = 'f5a38e9d6928abdf24c77b5266edd9f6'


class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/recipes'):
            self.handle_recipe_search()
        else:
            super().do_GET()

    def handle_recipe_search(self):
        n = 10
        diet = "balanced"
        calories = self.get_query_param('calories')
        url = f'https://api.edamam.com/search?q=Breakfast&app_id={EDAMAM_APP_ID}&app_key={EDAMAM_API_KEY}&to={n}&diet={diet}&calories={int(float(calories))-250}-{int(float(calories))+250}'
        print(url)
        try:
            response = requests.get(url)
            if response.status_code == 200:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(response.content)
            else:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(b'Error fetching recipes')
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b'Error fetching recipes')

    def get_query_param(self, param_name):
        query = self.path.split('?')[1]
        query_params = dict(qc.split("=") for qc in query.split("&"))
        return query_params.get(param_name, '')

Handler = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()