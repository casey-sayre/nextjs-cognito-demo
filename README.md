# Front End Demo

Login, Logout, call an (authenticated) API

Built with
* [Next.js](https://nextjs.org/)
* [Auth.js formerly NextAuth v5](https://authjs.dev/)
* [AWS Cognito](https://aws.amazon.com/pm/cognito)

## Notes

* The backend for this, a AWS CDK app that deploys a AWS Cognito User Pool, Lambdas, etc., is available 
[here](https://github.com/casey-sayre/lambda-demo).

* Cognito User Pool
   * Client type "Traditional web application" with client secret. 
   * scopes: email, openid, profile
   * Allowed callback URL (local dev): http://localhost:3000/api/auth/callback/cognito

* src/auth.ts is worth a look

* in the spirit of Next.js, all API calls are made from server side components
