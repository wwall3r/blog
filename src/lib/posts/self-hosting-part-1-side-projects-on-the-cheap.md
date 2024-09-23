---
author: "William Wall"
title: "Self-hosting Part 1: Side Projects on the Cheap"
date: "2024-09-22"
updated: "2024-09-22"
tags:
  - "projects"
  - "self-hosting"
  - "coolify" 
  - "server"
  - "deploy"
  - "docker"
coverImage: ""
coverWidth: 16
coverHeight: 9
excerpt: There are simpler ways to deploy software well without drinking the Kool-Aid.
---

One of the things that irks me about the current state of web development is
that everyone seems to be onboard for paying for tons of middlemen, along with
vendor lock-in, just to get their simple app deployed and running. Even though
companies often give small startups a free trial or a lot of credits to get
started, this still ends up resulting in cloud bills that are often way higher
than you would expect.

Cloud providers these days are yet another modern example of _The 
Emporer's New Clothes_. Your app likely does not have the same needs as a tech
giant, and Twitter and tech conferences are full of SaaS and PaaS companies
salivating at the opportunity to get you hooked on their 5-10x markup of AWS. 
There are simpler ways to deploy software well without drinking the Kool-Aid.

In this series, I'm going to show how easy it is to self-host off of a server
from anywhere, even a cheap VPS.

## Who is this for?

- You have an idea that for a cool thing you want to build. You want to put it out
there for people to try, and you don't want to have to raise VC funds to deploy
it and keep it running. You _especially_ do not want surprise cloud bills.
- Small startups that may not want to self-host, but want to avoid vendor
lock-in
- Larger companies that are on the tipping point of paying so much for their
cloud deployments that it might be simpler and cheaper to exit the cloud

## Step 1: Get a server

You can start with any one you can `ssh` into. Preferably, it should be
publically accessible via the internet since we will be deploying applications
to it, but it also could be an on-prem server on your local network if you want
to keep it private.

Virtual Private Servers (VPS) are also great option for this. Here are a few
providers to consider:

- [Digital Ocean](https://www.digitalocean.com)
- [Hetzner](https://www.hetzner.com)
- [Linode](https://www.linode.com)

AWS EC2 instances are also fine. Like I said, anything you can `ssh` into.

When you set up your server, be sure to set it up with your SSH key for
passwordless login.

## Step 2: Harden the server

This is a bit optional, as most providers will have at least decent security
defaults so that your server won't be insta-pwned and added to a bot-net as soon
as your DNS records are published. However, it is good practice to do this anyway.

I recommend logging into the server via `ssh` and running [Lynis](https://github.com/CISOfy/lynis), 
which will scan the system and give recommendations on what to change. The script 
itself does not make any changes for you. It only prints a report of what it finds.

// TODO: more here about firewall rules?

## Step 3: Point your domain to the server

If you have a domain name that you would like to use, this is a good time to
add some DNS records to point your domain to your server. If you don't have a
domain, I would highly recommend getting one since that's the only way to get
HTTPS and certificates properly configured.

(Configuring self-signed certificates for an intranet domain is probably
possible, but outside the scope of this guide.)

Here are the records you need to add via your domain registrar:

```
   A Record: yourdomain.com   -> <your server's IPv4 address>
   A Record: *.yourdomain.com -> <your server's IPv4 address>
AAAA Record: yourdomain.com   -> <your server's IPv6 address>
AAAA Record: *.yourdomain.com -> <your server's IPv6 address>
```

Your registrar may have some default records for your domain already, and those 
may conflict. If so, just remove the conflicting items (for A and AAAA records) 
and use the ones above.

## Step 4: Install the Build System

Here we come to the core of the self-hosting process, as the software we install
here is what is responsible for building and deploying our projects. I chose
[Coolify](https://coolify.io), an open-source and self-hostable Heroku / Netlify / 
Vercel alternative. Another option is [Dokku](https://dokku.com), and I am sure
there are others.

Here we will be self-hosting Coolify, however, companies may want to consider 
using their extremely reasonably-priced hosted offerings.


// TODO: scaling etc?
The hope and the dream is that your project will take off and go viral. If you
self-host, you are now responsible for the scaling of your project when it
receives the hug-of-death from your delighted new fans. In practice, this means:

- Static assets (images, CSS, JS, etc.) are fronted with a CDN
- Scale verticially first (upgrade your server/VPS with more RAM, CPU, etc.)

