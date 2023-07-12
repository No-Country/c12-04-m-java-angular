package com.no_country.project_ninja.api.domain.user;

import com.no_country.project_ninja.api.domain.subscription.Subscription;

public record DataUser(String email, String name, Subscription subscription) {

    public DataUser(User user){
        this(user.getEmail(), user.getName(), user.getSubscription());
    }
}
