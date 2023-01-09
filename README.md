# ponderful

A web application to ease the struggles of making plans or group decisions with a large group of friends.

Each user can create a unique session and generate a pool of options for their group of friends to pick from. Every session is uniquely identified by a randomly generated UUID stored within the database that links each session to the option pool and results.

This UUID session identifier is used as a URL parameter which can be shared to as many people needed. There are three stages for each session involving: 'Setup', 'Session', and 'Results.'

During the 'Setup' phase of the session, the user can add to the pool of options for their group to choose from. During the 'Session' phase, the user will be presented with two options at a time until they reach the end of the decision pool (one option left). After this, the user will be redirected to the 'Results' phase of the session that displays how many times everyone selected each option at the end (totals).

As a result, a group of friends can use this web tool to make large decision-makiing less difficult and cumbersome.

# Tools & Frameworks

MongoDB, ExpressJS, NodeJS, ReactJS, and MUI.

# Deployment

[Render](https://render.com/) was used to host the back-end, and [Vercel](https://vercel.com/) to host the front-end.

# Live Demo

[www.ponderful.vercel.app](https://ponderful.vercel.app/)

# Bugs & Fixes

- First request to the backend and database were extremely slow (only present during initial load of website).
  - This has been fixed.
