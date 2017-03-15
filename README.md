# Step 02 Populate the Program Page

[**1. Getting data from Drupal**](#1-getting-data-from-drupal)

[**1. Basic structure**](#1-basic-structure)

## 1. Getting data from Drupal

It's time to give some content to our **Program Page**. But to do it we must get data from somewhere and here is where the RESTful api we prepared on Drupal comes into play.
In order to keep separation of concerns Ionic use classes called **Providers**. These classes are normal plain classes decorated with the ```@Injectable()``` decorator to allow dependency injection. These classes are singletons, so we can consider them as a way to share information across the application and as a way to store the state of the application. 
We will use the **Ionic CLI** again to generate the provider we need by typing in the project folder:
```bash
ionic g provider program
```

This will create a _program.ts_ file in a providers folder. I consider good practice to rename this file to **program.service.ts** so it's easier to know the content of the file and to differentiate it from the _program.ts_ page file. We should also rename the class to **ProgramService**.
In order to use our service we must declare it in our module, so we will go to our _app.module.ts_ and add it to the providers array with its corresponding import statement.
This class the Ionic CLI created for us has already injected the Http class (we should make it private). This is the class we use to perform requests. 
We will start declaring a couple of constants that we will need, the base url for oure requests and an object to relate dates with Drupal nodes.

```typescript
  private readonly drupalUrl = 'https://seville2017.drupaldays.org/api';

  private readonly dates = {
    '2017-03-21': 126,
    '2017-03-22': 127,
    '2017-03-23': 128,
    '2017-03-24': 129,
    '2017-03-25': 130,
  };
```

No we create a method to get a program by its date. This method receives a Moment object representing the date and returns an Observable, which is:
> A representation of any set of values over any amount of time. This the most basic building block of RxJS.

It's, then, a construct of [RxJs](http://reactivex.io/rxjs/) the javascript implementation for **Reactive Programming**. 
Our method, for now, just makes the requests and gets the data from the response:

```typescript
getProgram(date: Moment): Observable<any[]> {
  const programId = this.dates[date.format('YYYY-MM-D')];

  return this.http
             .get(`${this.drupalUrl}/${programId}`)
             .map(res => res.json());
}
```

We will improve this method later, now we are gonna give it a try.
We will go back to our _program.ts_ file and add a new method called **ionViewDidLoad**. This method is a lifecycle hook and it will be called by Ionic once the page has been loaded. It's then the moment to request the asynchronous content of the page.
In this method we will call our service method and then subscribe to the result and print it to the console to check if it's working:
```typescript
ionViewDidLoad() {
  this.programService.getProgram(this.navParams.data as Moment)
      .subscribe(program => console.log(program));
}
```

You should now be getting something like this:

![first_request](./images/first_request.png)

## 1. Basic structure

