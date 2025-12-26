import React from 'react';
import SubscriptionDetails from './SubscriptionDetails';
import MySubscription from './MySubscription';

const ProfileComponent = () => {
    return (
        <div>
            <MySubscription/>
            <SubscriptionDetails/>
        </div>
    );
};

export default ProfileComponent;