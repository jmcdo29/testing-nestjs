 <p align="center">
  <img src="./testCoverage.png"/>
</p>

# Http Sample

Welcome to the example of using the HTTP module with Nest and running tests! I decided to use a very simple Nest application with the use of HttpModule and with the use of observables, while to create a fake server I used the [json-server](https://github.com/typicode/json-server) package, creating a `cats.json` file like this:

```
{
     "cats": [
       {
         "id": 1,
         "name": "Test Cat #1",
         "age": "5",
         "breed": "Russian Blue"
       },
       {
         "name": "Test Cat #2",
         "age": "10",
         "breed": "Russian",
         "id": 2
       },
       {
         "id": 3,
         "name": "Test Cat #3",
         "age": "3",
         "breed": "Russian"
       }
     ]
   }
```

Not much more to say except I hope this is found useful for the community!
