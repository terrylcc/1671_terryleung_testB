# 1671_terryleung_testB

## Question 1

```shell
$ cd question1/
$ javac App.java
$ java App
Input: retlaohS
Output: Shoalter
```

## Question 2

```shell
$ cd question2/
$ cat App.sql
```

## Question 3

```shell
$ cd question3/
$ python3 App.py
```

## Question 4

API specification

```shell
POST /shipping-fee

{
    "parcels": [
        {
            "length": 32,
            "width": 26,
            "height": 26,
            "weight": 5,
            "temperatureCondition": "Ambient",
            "quantity": 1
        },
        {
            "length": 210,
            "width": 3,
            "height": 3,
            "weight": 1,
            "temperatureCondition": "Ambient",
            "quantity": 10
        },
    ]
}
```

Start the server

```shell
$ cd question4/server
$ npm start
```

Start the webapp

```shell
$ cd question4/client
$ npm run serve
```

Go to http://localhost:8080/

## Question 5

API specification

```shell
POST /data-migration

{
    "csvUrl": "http://localhost/la_crime_2010_to_2013.csv"
}

POST /search

{
    "from_date": "2022-01-01 00:00:00",
    "to_date": "2022-06-01 00:00:00"
}
```

Start the server

```shell
$ cd question5/
$ npm run serve
```
