package com.no_country.project_ninja.api.domain.subscription;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    @Override
    List<Subscription> findAll();
}
