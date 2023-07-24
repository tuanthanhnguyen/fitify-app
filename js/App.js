import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { theme } from './themes/'

import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import SignIn from './pages/SignIn/'
import SignUp from './pages/SignUp/'
import ForgetPassword from './pages/ForgetPassword/'

export default function App() {
  return (
    <Router>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/comingsoon" component={ComingSoon} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/community" component={Community} />
          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/post/:id" component={PostView} />
          <Route exact path="/profile/:id" component={UserProfilePage} />
          <Route exact path="/create" component={CreateBlog} />
          <Route exact path="/test" component={BlogEditor} />
          <Route component={NotFound}></Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}
