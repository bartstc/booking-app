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

## Tech Stack/Patterns (.NET services)
* .NET Core
* Event-driven architecture
* MassTransit
* EventSourcing
* Marten
* Outbox pattern
* Entity Framework Core
* Dapper
* Scrutor
* Outbox pattern
* Decorator pattern
* Optimistic concurrency
* Gateway
