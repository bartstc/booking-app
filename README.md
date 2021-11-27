# Booking App
An example of a domain driven design project with an comprehensive services reservation domain.

## Domain Description
The main focus of the domain is to enable **comprehensive and flexible booking of services.**

There are two contexts within the domain model. The context of the company providing the services - the service provider, and the client - recipient who wants to use them. For the company, the measure of success, apart from **profit**, is also **the facilitation of management**, for the client, however **mobility and satisfaction with the entire process of providing the selected service**.

**The domain model from the company side** assumes the existence of a coherent system and a set of tools enabling the management of small and medium-sized companies from various industries. The offered tools and proposed practices are aimed at facilitating, accelerating and coherent management of the company in the field of **efficient use of the company's resources** (employees, capital, accessibility), **defining the services offered** and **providing the necessary information to potential service users**.

The model should ensure the efficient provision of any service in the company-customer relationship throughout **the entire duration of the booking**, and in particular, allow **exchange of necessary information at the request** of the customer or company and **change of service status** (postponement, cancellation, service change ...).

The company-side model should also provide a reporting module. It should provide the manager with information on the efficiency and use of available resources, as well as a number of statistics on services purchased by customers or discounts used and the resulting benefits.

The domain model from the customer's point of view, the service recipient, will be designed to **enable comprehensive and, above all, flexible use of the service chosen by him and available in the system**. The model should enable simple and quick registration of the selected offer and lead through the entire process until the final use of the service.

The recipient should be able to assess and compare the competitiveness of the available services.

## Main Assumptions
todo

## Project Structure and Architecture
todo

## Launching the application

At the very beginning, you need to define environment variables for each site. Add the following `.env` files to the repository:
```
TODO
```
Now you can launch entire application with just one single command:
```
docker-compose -f docker-compose.client.yml up -d
```
All available services will be launched locally. There are two clients in the application: employee context and client context.
  - **Employee context** will be running on `localhost:3001`.
  - **Client context** will be running on `localhost:3002`.

To fully test both client applications (and thus the entire microservices system) you must be logged in.
  - **Employee context** - there is no registration available this time but there is a test user account dedicated to this.
      
      ```
        Email: john@gmail.com
        Password: John123$
      ```
  - **Client context** - in this case, you will be able to register yourself using your own email address.

**Warning**: Users are stored in the same database and the same authorization provider exists for each client application. To avoid errors with the login session, remember to log out earlier when changing the context (client). Or, even more secure, run both applications in separate browser windows in `incognito mode`.


## Services & Environments
* Accessibility - .NET Core
* Community - .NET Core
* Gateway - .NET Core
* Identity - .NET Core
* Management - NodeJS (NestJS)
* Employee Web Client - React & TypeScript
* Customer Web Client - React & TypeScript

## Tech Stack/Patterns

### .NET environment
* .NET Core
* Event-driven architecture
* MassTransit
* EventSourcing
* Marten
* Entity Framework Core
* Dapper
* Scrutor
* Outbox pattern
* Decorator pattern
* Optimistic concurrency
* Gateway

### NodeJS environment
* NestJS
* TypeScript
* CQRS
* TypeORM
* Event-driven architecture
* AMQP (Rabbit)

### Web Clients environment
* React
* TypeScript
* Chakra UI
* React Intl
* OIDC Client
* React Query
* React Hook Form
* RxJS
