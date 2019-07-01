---
layout: post
title:  "Tech Firm Battle"
date:   2019-06-20
author: "Adriel"
---

<img src="{{ site.url }}/assets/apple-orange-comparison.jpg" width="100%">


A couple of months in true software engineer fashion, I switched employers in search of new adventure and greener pastures.

I said goodbye to my coworkers and the project I had been working on for the past few years and moved a few blocks away to a new job. It was bittersweet leaving a project I had put so much effort into, however I was excited to see what I would learn from the switch.

After reflecting for a couple of months I couldn't help but compare the practices and norms from Job A (previous) to Job B (current).

This is not meant to be an evaluation or rating of each job. Both jobs have advantages and disadvantages and it would be unfair to pick favorites. Rather, I'd like to conduct a comparison and reflection in order get closer to finding the optimal way of developing software.

## Software development methodology

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Framework      | Scrum       | Scrum
| Sprint Length   | 3 week        | 2 week
| Standup Length   | 5-10 min        | 15-25 min
| Grooming per week   | 2 hr        | 1hr
| Retrospective   | Yes        | No
| Story point estimation   | Yes        | Yes


Both companies embrace scrum principles and strive to implement it into daily life. I feel like company A followed scrum a bit more strictly than company B, however that doesn't necessarily make it better.

I liked how in my last job we had a strict time box for standups and made sure not to go over.

Although we did retrospective after every sprint in my previous job, I didn't necessarily think we gained a lot from doing it. In fact, I think sometimes people were just not really sure what to say during retrospective.

In my current job we've skipped past retrospective. I can't say I miss retrospective very much, however I do think it would be nice to do it every once in a while or just for 15 minutes.

I'm all for continuious improvement, but to have to come up with a concrete plan of what to change process-wise for each sprint is a bit overkill in my opinion.

## Localization

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Localize strings in App?      | Yes       | No

This one caught me by surprise. Although I had only worked one job professionally as a front end engineer before starting Job B, I had thought that all companies followed this practice.

As it turns out company B hardcodes english strings into the app. The company does have customers who work in other languages, however apparently the foreign customers have memorized where to click.

Not worrying about internationalization makes it a bit quicker to develop, however something feels wrong about it. Even if we had only supported English I would feel better about using localization functions. I especially feel this way after turning my app into spanish mode and seeing the product I built suddently switch to a different language which I wouldn't be able to do with Job B.

## Code Base Structure

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Microservices?      | No       | Yes
| Monolith?      | Yes       | No

In this regard Job B wins the prize simply because webpack compilation time is way faster in Job B. I remember in Job A it wouldn't take a painfully long amount to time to reload the app after making changes. This was mostly because webpack was trying to compile so much es6 that it couldn't possibly to it fast enough with Babel's current capabilities.

This makes life much easier. In fact, when I first started at Job B I was delighted to see how fast I could start running the app.

## Running Front End Apps Locally

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| API running locally      | Sometimes       | No

Job B wins in this respect. In order to run front end code locally, all developers have to do is specify which environment they want to use for a backend. To do this, all the developer has to do is update a config file specifying to environment.

## React

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Webpack      | Yes       | Yes
| Redux      | Yes       | Yes
| NPM/Yarn      | yarn       | npm
| Jest      | Yes       | Yes
| Snapshot testing      | Yes       | No
| Thunks      | Yes       | No
| Hooks      | No       | Yes
| Sagas      | No       | Yes
| Lodash      | No       | Yes
| CSS Extension      | CSS Modules       | Less

In Job A, things were more consistent but less experimental. For example there was only one team deciding which patterns an technology to use. 

In Job B, each team is empowered to make their own technology choices. For example the team that I am on is the only team that uses React hooks. I find hooks to be extremely useful. They greatly reduce the complexity of connecting to a Redux store and dealing with retrieving data form and manipulating the store. The only disadvantage I see to hooks is that it makes it a lot trickier to split big components into small ones. Often times with hooks a parent component controls all the state and passes it down to its children though too many props. Since hooks use local component state, there ends up being multiple stores of data. Still I think the pro's of hooks outweight the cons.

In general I like how each team is empowered at Job B to make their own tech choices and then come together with other teams to discuss the best ways to do things.

## QA Testing

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Separate quality engineers      | Yes       | Yes
| Separate engineer for manual UI testing      | Yes       | No
| Each ticket gets passed through the quality engineer      | Yes       | No

In Job A, each ticket that was completed went to a quality engineer. The ticket could only be considered done if that engineer signed off on it to assure it met it's criteria.

In Job B, there *is* a separate quality team, however that team only focuses on integration or end to end testing. There is no separate engineer to manually test UI stories and it's up to all the engineers to do these checks.

In my opinion Job B has the better method. Although they sometimes do find bugs, I think it's a bit silly to have a separate engineer to manual tests. Manual testing is important to do but I don't think it needs two separate engineers to do it because...
1. That means two engineers have to get all their settings in the right spot to test the behavior in the UI. This could often mean setting other things up, having these engineers collaborating together to get the other one up to speed, etc.
1. Manual testing is not very valuable because it can't be run automatically. Any manual test that you do today and mark as complete could very well break a month from now if somethng else changes. Unless that quality engineer can put a non brittle automated test on it, it's not worth it in my opinion to get two sets of eyes on it.
1. All enginners should be in charge of quality. If a UI engineer is not manually testing features or fixes with various edge cases, then they are not doing their job well.

In Job B I feel a bit more free and empowered to move quickly, knowing that I can mark a story as complete all on my own. In Job A, I often got slowed down by marking a story as complete, having it get kicked back, and having to context switch back to working on the story. This especially got bothersome if it got kicked back for reasons that I didn't think qualified as getting kicked back which was subjective.

In summary, I enjoy the practice in Job B more by the ability to move quick and take responsibility for my features/fixes, however I do feel like having a separate set of eyes on the tickets helped to ensure quality. 

## Company Culture

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Weekly lunches      | No       | Yes
| Work from home      | Yes       | Yes
| All engineering in office      | No       | Yes

Both companies allow employees to work from home, however I notice a bit more at Job B. The floor plans are a bit similar, with all engineer sitting it a clump of desks together.

A big difference is that in Job B, almost everyone in the office is either an engineer or engineering manager. In my opinion this creates a bit more of a collaborative environment because we're all in the same boat. Also the weekly catered lunches bring the team together and helps people get to know each other, something that has a lot of value when it comes to get people to feel like a team.

## Deployment

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Scheduled on regualr invervals      | Yes       | No
| Has dedicated telease engineers      | Yes       | No

In Job A, I had nothing to do with releasing our software. My job was to commit code to the master branch of our repositories. After the sprint ended and on a specific time window a release engineer would deploy our software to production environments in a process I was unfamiliar with.

In Job B, I am the person responsible to releasing software to production. There is no set interval when the code gets released, rather it gets released when a product manager asks for it. Deploying is as easy and running a command on a terminal.

Both have their ups and downs. Job A was nice because I never had to worry about deployment and I could just focus on building. However Job B is nice because I have more control about when to release, and it empowers me knowing I have the ability to get features or fixes into the hands of customers all on my own. This doesn't come without it's drawbacks though. In Job B, there is often confusion about which versions of software are running on which environments and sometimes it's not clear what has been released and what hasn't.

## Code Review

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Inter-scrum team code reviews      | No       | Yes
| "Approved pending comments" reviews     | Yes       | Yes

In both jobs, a common practice is to leave a couple of suggestions or point something important out, then approve a tell engineer to address comments before merging to unblock them. I like this approach because it allows the engineer to move forward without having to wait again to make changes and get the reviewer to take a second look.

The biggest difference between the two jobs is that in Job B, an engineer might be reviewing another engineer's code who is on a different scrum team. In fact there are times where one engineer is pretty unfamiliar with the feature or fix that is happening in the pull request.

I haven't made up my mind here about the best way to do it. On the one hand, it's good to get a bunch of diverse eyes on some changes to enforce a unified code base across teams. On the other hand, an inter-scrum team engineer might not understand the context of the code and it probably won't be worth them to get up to speed on it. In this case, engineers typically review based on code style, not on functionality or anticipated use cases.

I think it comes down to whether or not a shallow or deep review is considered necessary. I still don't know the right answer to this, however I prefer giving shallow reviews because it minimizes the degree of context switching an engineer must do.


## Task Management

|      | Job A | Job B |
| ----------- | ----------- | ----------- |
| Jira      | Yes       | Yes
| Creator of tickets      | PMs       | Developers
| Strict ticket format requirements      | Yes       | No

In Job A product managers created the tickets and then engineers reviewed them and added detail or corrections. I feel like this approach is a bit flawed because product managers don't have as much of a grasp of the amount of work to complete each feature or bug fix and therefore it will be more difficult for them to come up with roughly bite sized chunks of work. In Job B, product managers discuss the work that needs to be done and answer questions about it, however it is up to the engineers to create tickets. Before bringing them into the sprint, these  tickets are groomed to provide clarification to the team and estimates.
