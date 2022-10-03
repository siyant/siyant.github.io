---
layout: post
title: TraceTogether Token
period: 2020-22
img: /assets/img/proj-tracetogether-token/header-img.jpg
---

[TraceTogether](https://www.tracetogether.gov.sg) is Singapore's national digital contact tracing system for the COVID-19 pandemic, developed by Government Technology Agency (GovTech) in collaboration with the Ministry of Health.

The TraceTogether Token is a small physical device, offered to Singapore residents and visitors to facilitate participation in the TraceTogether programme. Millions of tokens were distributed between Sep 2020 and end 2022.

<figure>
<img src="/assets/img/proj-tracetogether-token/header-img.jpg" class="width600">
<figcaption>Various TraceTogether Tokens in different shapes and colours</figcaption>
</figure>

I was a core member, and later became the technical lead, of the team in GovTech that built and maintained the back-end system for the token. This enabled the smooth running of token distribution and contact tracing operations in Singapore during the pandemic.

## How it works

<figure>
<img src="/assets/img/proj-tracetogether-token/get-app-or-token.png" class="width600">
<figcaption>Screenshot from TraceTogether website</figcaption>
</figure>

Singapore residents and visitors could collect a TraceTogether Token, and/or download the TraceTogether mobile application. Both work similarly using the [BlueTrace](https://bluetrace.io) Lite protocol, and are interoperable.

Once activated, each device (app or token) broadcasts an encrypted, anonymized ID that changes periodically. At the same time, each device repeatedly scans for other nearby TraceTogether devices' broadcasts, and records the IDs of the other devices in its own storage. This advertising and scanning communication between devices is done over Bluetooth Low Energy. The token does not have GPS or internet connectivity, so all the data stays on the token, and is deleted after 25 days.

<figure>
<img src="/assets/img/proj-tracetogether-token/broadcast-scan-record.png" class="width600">
<figcaption>A simplified illustration of a TraceTogether Token and App detecting and recording each other</figcaption>
</figure>

When someone tests positive for COVID-19, he/she hands over their token to an authorized personnel. The data on the token is extracted and sent to our backend. The backend then decrypts the data, and uses it to identify the person's close contacts. Based on the distance and duration of the contact, the system triggers the corresponding follow-up action, eg. quarantine, self-isolation, or a notification to self-monitor and test.

## My role

I directly worked on, or led, the development of many of the components of the system, together with my team members. These include:

- Cryptography schemes for the TraceTogether Token's communication
  - This ensures that the token's broadcasted ID cannot be deciphered by an attacker to obtain any information about the user, but can be associated back to the user by GovTech if required for contact tracing
- APIs for token distribution, integrating with [SupplyAlly app](https://www.supplyally.gov.sg) used by staff on the ground, as well as [vending machines](https://www.channelnewsasia.com/singapore/covid-19-tracetogether-replacement-token-machines-nex-sun-plaza-2063691) for self-collection
- APIs and backend integrations with the TraceTogether app backend, so that both systems are interoperable
- APIs for the SafeEntry system, which allowed users to use their tokens to "check in" to venues in Singapore
- Postman API tests for all the above APIs, which are run in the Jenkins CICD pipeline
- A web dashboard for token distribution statistics and reports, used by the operations team as well as policy-making teams
- Android application that retrieves data from TraceTogether tokens over Bluetooth. This is only used by authorized staff in healthcare facilities, to retrieve data from COVID-19 patients's tokens
- Flutter mobile application, used by manufacturing teams for quality control and updating tokens' firmware over Bluetooth

I also communicated frequently with various stakeholders involved in the project, including other software development teams in GovTech, vendors, and operations staff. As a developer who was accustomed to focusing and writing my code, I was not used to this liaising work at first. Over time, I grew to be more comfortable in this role, and appreciated having a broader perspective of the project.

Through this, I learnt to better:

- Understand the business needs through discussions with other stakeholders
- Translate them into software requirements (or sometimes, identify that software was not the best solution and discuss alternative operations flows)
- Design the communication flow between multiple microservices or systems
- Draw or write out sequence diagrams and API specs, to ensure a shared understanding of how new features will be implemented
- Coordinate implementation, testing and debugging among multiple teams

## Team members

Project managers: Andrew, Ivan, Tony  
Developers: Benjamin, Chien Hsing, Eugene, Lucas, Yi Ning

## Credits

Image of different TraceTogether tokens courtesy of Tony  
TraceTogether logo and images obtained from [https://www.tracetogether.gov.sg](https://www.tracetogether.gov.sg)  
Iphone icon created by [Maxim Basinski Premium - Flaticon](https://www.flaticon.com/free-icons/iphone)
