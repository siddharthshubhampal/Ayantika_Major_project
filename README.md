# askJames-faceMatcher-backend

FaceMatcher is an app that lets you manage membership of a club using member's faces - it uses AWS Rekognition to enroll and verify faces.

The completion documentation of this tutorial is available at: https://hackernoon.com/how-to-build-a-member-app-using-facial-recognition-and-serverless-ed33c340f37d.

There is also a video walk-through at: https://www.youtube.com/watch?v=nyNKOYqZ3b4.

The backend portion of the code configures the Lambda functions that comprise the API for the frontend, and the triggers between the S3 bucket, Rekognition and DynamoDB. You will need to complete the steps in the tutorial to deploy successfully.

This code is provided without any warranty. You are responsible for any AWS charges you incur. This is not suitable for production usage and is only provided for educational purposes.

# Prerequisites

- You need to install the backend project in your AWS account first. Go to https://gitlab.com/jbesw/askjames-facematcher-backend for details.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Questions

Please contact James Beswick @jbesw on Twitter. Feel free to use this code however you choose, though no warranty is implied.