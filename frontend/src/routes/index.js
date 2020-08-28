import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Verification from '../components/RegistrationVerification';
import Login from '../components/Login';
import Registration from '../components/Registration';
import RegistrationMessage from '../components/RegistrationMessage';
import Homepage from '../components/Homepage';
import Profile from '../components/Profile';
import Search from '../components/Search';
import Restaurant from '../components/Restaurant';
import EditRestaurant from '../components/Restaurant/EditRestaurant';
import ReviewCreate from '../components/ReviewCreate';
import CreateNewRestaurant from '../components/RestaurantCreateNew';
import SuccessCreatedRestaurant from '../components/RestaurantCreateNewSuccess';

const MainRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/verification" component={Verification} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route
          exact
          path="/createnewrestaurant"
          component={CreateNewRestaurant}
        />
        <Route
          exact
          path="/registrationmessage"
          component={RegistrationMessage}
        />
        <Route
          exact
          path="/successCreatedRestaurant"
          component={SuccessCreatedRestaurant}
        />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/restaurant/:id" component={Restaurant} />
        <Route exact path="/restaurantedit/:id" component={EditRestaurant} />
        <Route exact path="/createreview/:id" component={ReviewCreate} />
        {/* <Route
          exact
          path="/createreview/:id"
          component={protectedComponent(ReviewCreate)}
        /> */}
      </Switch>
    </Router>
  );
};

export default MainRoutes;
