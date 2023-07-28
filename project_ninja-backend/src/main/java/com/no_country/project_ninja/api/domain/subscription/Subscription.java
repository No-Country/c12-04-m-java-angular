package com.no_country.project_ninja.api.domain.subscription;

import com.no_country.project_ninja.api.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "subscription")
@Entity(name = "Subscription")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_subscription", length = 20)
    private String nameSubscription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameSubscription() {
        return nameSubscription;
    }

    public void setNameSubscription(String nameSubscription) {
        this.nameSubscription = nameSubscription;
    }

}
