
In ` backend ` folder

!! rename ` innit_db.sqlite3 ` -> ` db.sqlite.3 ` , after cloning the project

Generate the requirements
```bash
py -m pip freeze > requirements.txt
```

Install the requirements
```bash
pip install -r requirements.txt
```

Make Migrations:
```bash
py manage.py makemigrations
```

Migrate
```bash
py manage.py migrate
```

For admin:
```bash
py manage.py createsuperuser
```

Start the server
```bash
py manage.py runserver
```

Database:
```bash
http://127.0.0.1:8000/admin/
```