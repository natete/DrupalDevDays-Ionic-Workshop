# Step 03 Populate the Session Page

[**1. Enable navigation to the Session Page**](#1-enable-navigation-to-the-session-page)

## 1. Enable navigation to the Session Page

First things first. We need a way to navigate to the Session page. In this case we don't want to set the root of the application, instead we want to push a new page to our navigation stack.
So we will bind the _click_ event of the _ion-item_ element to a **goToSession** method in our ProgramPage class. This method will receive the session itself.

