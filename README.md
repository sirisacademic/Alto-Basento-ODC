# OpenDataBasento

Frontend of the OpenDataBasento project, the platform developed by [SIRIS Academic](http://www.sirisacademic.com) for the Comunità Montana Alto Basento aimed to open the access to the available data related to the public procurement of this administration.


## Getting Started
### Prerequisites

To work on the website locally, you must have [Node](https://nodejs.org/en/) installed on your computer. 

### Installing
Download this repository with Git, then run

```
npm install
```
to install the project's code dependencies.
You can start a local webserver with  start command
```
npm start
```
The website now should be running at http://localhost:3000. This webserver will auto-reaload when you change the Javascript code.

To build the application itself, execute the build command
```
npm build
```
Both commands ```start``` and ```build``` create the environment variable REACT_APP_API_ENDPOINT, which get different values whether we create the development or the production version of the app.



## Built With

* [React](https://reactjs.org/) - A javascript library for building user interfaces.
* [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps.
* [Semantic-UI-React](https://react.semantic-ui.com/) - The official Semantic-UI-React integration of Semantic-UI, the development framework that helps create beautiful, responsive layouts using human-friendly HTML.
* [Vega.js](https://vega.github.io/vega/) - A visualization grammar, a declarative language for creating, saving, and sharing interactive visualization designs.
* [YASGUI](http://about.yasgui.org/) - A feature-packed user-friendly interface to access any SPARQL. endpoint 

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Xavi Gimenez** - *FrontEnd development and Data Visualization* - [Xavi Gimenez](https://github.com/XavierGimenez)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

The MIT License (MIT)

Copyright (c) 2019 SIRIS Academic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
