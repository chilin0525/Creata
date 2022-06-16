# Creata

## server

* please check your DB serivce is running before running
* prepare env file: ```.env``` 
    ```
    .
    ├── client
    ├── .env
    ├── .git
    ├── .gitignore
    ├── node_modules
    ├── package.json
    ├── README.md
    └── server
    ```
* content of ```.env```
    ```
    PORT = 
    GOOGLE_CLIENT_ID = 
    GOOGLE_CLIENT_SECRET = 
    GOOGLE_CALLBACK = 
    SECRET = 
    ```

## issues

* [ ] prevent hard code port in clinet side

## API

|URL|Description|return|
|:---|:---|:---|
|```/auth/user```|1. Get user information <br> 2. Check user login|TBD to json|
|```/auth/logout```|Logout user|null|
 