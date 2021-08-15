# Homelane Backend APIs

**Getting started**

**step1 clone repo**

git clone https://github.com/sirdon/dhwani-frontend.git

**step2 install dependencies**

npm install

**step3 run project**

npm run start

**Create user**
POST api to create user - https://homelaneapi.herokuapp.com/user
body - 
````
{
    "name":"name",
    "email":"email@gmail.com",
    "password":"password"
}
````


**Login** 

POST api to login using email,password - https://homelaneapi.herokuapp.com/user
body - 
````
{
    "email":"email@gmail.com",
    "password":"password"
}
````
**copy token from response and put into header for requesting GET and other api**
**User Get APIs** 
1) GET api to get date info - https://homelaneapi.herokuapp.com/Get_date_info
pass header token into header,param or in body - token
pass date in query params or in header or in body - date
````
{
    "date":"27-06-2021"
}
````
Response will be like - https://jsonblob.com/c9b33f1a-fdd9-11eb-b644-59bcb9260847



2) GET api to get state info - https://homelaneapi.herokuapp.com/Get_state_info
pass header token into header,param or in body - token
pass date in query params or in header or in body - state
````
{
    "state":"Delhi"
}
````

Response will be like - https://jsonblob.com/b01615a6-fdd9-11eb-b644-6d6a4e319840



3) GET api to get Pinpoint state - https://homelaneapi.herokuapp.com/Pinpoint_state
pass header token into header,param or in body - token
pass date in query params or in header or in body - date,state
````
{
    "date":"27-06-2021",
    "state":"Delhi"
}
````
Response will be like - https://jsonblob.com/881af34d-fdd9-11eb-b644-5f3522daa24b



4) GET api to get Pinpoint states date - https://homelaneapi.herokuapp.com/Pinpoint_info
pass header token into header,param or in body - token
pass date in query params or in header or in body - date,states
````
{
    "states":"Kerala,Delhi",
    "date":"12-05-2021"
}
````
Response will be like - https://jsonblob.com/46c6b4e9-fdd9-11eb-b644-bb7fba7bc00a



