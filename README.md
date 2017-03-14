# Step 01 Preparing the application

[**1. Overview**](#1-overview)

[**2. Rename given pages**](#2-rename-given-pages)

## 1. Overview

Our application lives in the src folder and should look like this:

![Folders structure](./images/folders_structure.png)
 
Inside of this folder there are two folders we must pay attention to by now:


* **app**: it's the main folder of the app, where the application goes to start and where we configure the main 
module of our application. This folder contains five files:

  * _app.component.ts_: is the controller of this first view. This is where we will define the items of the side menu
   and where we will take the actions needed on the application startup.
  * _app.html_: is the first view to be loaded. In our case it's where the side menu is defined.
  * _app.module_: this is where we configure the Angular module of the applications. We must declare here the pages 
   and providers we use in the application.
  * _app.scss_: where we define the global styles of the application.
  * _main.ts_: where the underlying Angular application is bootstrapped.

* **pages**: it's where our pages live (we can associate the idea of a page with the idea of a view o our app). Each 
page, usually is built with three files:
  * _the markup file_: a html file with the markup of the page.
  * _the styles file_ a scss file with the styles of the page.
  * _the typescript file_: this file acts as the controller of the view and is where we add behavior to the view.
  
## 2. Rename given pages

Our application uses just two views so we will recycle the ones the Ionic CLI gave us to meet our needs. So we need to rename _page1_ folder and files to _program_. If your IDE doesn't dispose of refactoring tools you must make the following changes in the following files.

* **program.ts**:  
  * Change the selector name from _page-page1_ to _page-program_
  * Change the templateUrl from _page1.html_ to _program.html_
  * Change the class name from _Page1_ to _ProgramPage_
* **program.scss**: change the selector from _page-page1_ to _page-program_
* **app.module.ts**: 
  * Change the _Page1_ import from ```import { Page1 } from '../pages/page1/page1';``` to ```import { ProgramPage } from '../pages/program/program';```
  * Change both in *declarations* and *entryComponents* from _Page1_ to _ProgramPage_ 
  
Proceed similarly recycling Page2 into Session:

* **session.ts**:  
  * Change the selector name from _page-page2_ to _page-session_
  * Change the templateUrl from _page2.html_ to _session.html_
  * Change the class name from _Page2_ to _SessionPage_
* **session.scss**: change the selector from _page-page2_ to _page-session_
* **app.module.ts**: 
  * Change the _Page2_ import from ```import { SessionPage } from '../pages/page2/page2';``` to ```import { SessionPage } from '../pages/session/session';```
  * Change both in *declarations* and *entryComponents* from _Page2_ to _SessionPage_
   
Finally to make things work again we will remove any references to Page1 and Page2 from _app.component.ts_ and we'll let it just pointing to our ProgramPage which will act as our home page. It should look like this:

```typescript
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ProgramPage } from '../pages/program/program';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ProgramPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Program Page', component: ProgramPage }
    ];

  }

  initializeApp() {
    this.platform.ready()
        .then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          StatusBar.styleDefault();
          Splashscreen.hide();
        });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
```

Now everything should work just fine in your application and we can carry on and start with the fun part.