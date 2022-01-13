import os
import random
import string

from flask import Flask, send_from_directory, abort
app = Flask(__name__)

data_path = './serverdata/'
data_filename = 'sample.txt'
file_size = 1024
file_content = ''.join(random.choices(string.ascii_letters + string.digits, k=file_size))

if not os.path.exists(data_path):
  os.mkdir(data_path)

fd = open(data_path + data_filename, 'w+')
fd.write(file_content)
fd.close()

@app.route('/')
def get_file():
  try:
    return send_from_directory(data_path, data_filename)
  except FileNotFoundError:
    abort(404)

if __name__== '__main__':
  port = int(os.environ.get("PORT", 5000))
  app.run(host='0.0.0.0', port=port, debug=True)
