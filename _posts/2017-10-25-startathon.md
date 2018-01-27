---
layout: post
title: Startathon - Project Vigilance
---

![Startathon banner](/assets/img/2017-10-25-startathon/banner.png){: .inline }

Somehow in my two years in SUTD I'd only ever gone for a hackathon once (and it was not a tech one but one on social entrepreneurship), so when a friend asked me to join him for #startathon I immediately agreed. 

Little did I know that I'd injure my knee just a few days before the event and end up on crutches the whole time...

But anyway. Despite my immobility I still had a good time! This hackathon has a big focus on hardware and making things, so they had a fabrication area with 3D printers and tools for building things with wood and cardboard. It's organized by [ideasinc](http://www.ideasinc.sg) and is a really good deal because $10 gets you a t-shirt and 4 really good meals xD

### Challenge statements

There were three challenge statements given and we chose one sponsored by PSA: 

> How might we leverage on technology to encourage staff to voluntarily uphold safety in the workplace?

The context is that Personal Protective Equipment (PPE) such as helmets, high-visibility vests and harnesses must be worn at all times at work sites, but the current enforcement method of having daily and random checks is not ideal. While penalties are already issued to staff who do not wear their PPE properly, it would be better if we can motivate them to take charge of their own safety.

### Our solution - Project Vigilance!

Project Vigilance is a holistic solution based on three main ideas.

- **Wearable sensors on each piece of equipment**

We used a helmet for our prototype, and added a LDR inside it to detect if it is being worn, and copper strips on the strap to detect if it is buckled. This is supposed to be a modular design, so the sensors can be easily installed on any equipment.

![Helmet with sensors](/assets/img/2017-10-25-startathon/prototype-helmet1.jpg){: .inline }
![Close-up of helmet](/assets/img/2017-10-25-startathon/prototype-helmet2.jpg){: .inline }

- **Immediate motivation using a buzzer**

I was thinking about how cars force people to put on their seatbelts by beeping annoyingly, and we applied this idea to the PPE.

We used an arduino and connected the 2 sensors (LDR and copper strips) in a circuit. So basically if the resistance is 0 (copper strips disconnected as chin strap is not buckled) or too high (LDR detects light as helmet is not being worn), the buzzer will start to beep until the problem is corrected!

- **Linking to an automated rewards system**

Similar to HPB's Healthy 365 app but slightly different: users will get rewarded for adhering to safety rules, while safety breaches (as detected by the sensors) will reduce the amount of rewards. We made a prototype of how this will work using RFID cards and tags:

![RFID sensor and screen](/assets/img/2017-10-25-startathon/prototype-rfid1.jpg){: .inline }
![After tapping](/assets/img/2017-10-25-startathon/prototype-rfid2.jpg){: .inline }

Almost all the groups who did this challenge had solutions involving wearable sensors. We tried to focus more on the motivation part, and I think ours is differentiated by the rewards system because it is automated and uses a "carrot" rather than "stick" approach!

### Problems
Of course, not everything was smooth sailing. We originally wanted use a temperature sensor for the inside of the helmet, because it's harder to cheat than a light sensor. But for some mysterious reason it didn't work even after we tried different thermistors and spent a lot of time trying, so we decided it wasn't worth the frustration and went with the LDR. Also, we bought an arduino nano as the microcontroller for the helmet part, and got it all wired up and working fine. And then it suddenly died at 2am. Luckily I brought another arduino uno so we just switched to that.

![The hall](/assets/img/2017-10-25-startathon/hall.jpg){: .inline }
![At night](/assets/img/2017-10-25-startathon/hall-night.jpg){: .inline }  
[The hall in the morning vs at night]

In the end we finished our prototypes around 4am! (Then had macs supper ^^)

I honestly think they're pretty cool.

![Our prototypes](/assets/img/2017-10-25-startathon/prototype.jpg){: .inline }

![Our pitching setup](/assets/img/2017-10-25-startathon/pitching-setup.jpg){: .inline }