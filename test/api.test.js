import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";        // add `.js` if using ES modules
import User from "../models/user.js";  // add `.js` if using ES modules
import Dog from "../models/dog.js";    // add `.js` if using ES modules

chai.use(chaiHttp);
const should = chai.should();

describe("Dog Adoption Platform API", () => {
  let authToken;
  let dogId;

  before(async () => {
    // Clean database before tests
    await User.deleteMany({});
    await Dog.deleteMany({});

    // Register a user
    await chai.request(server).post("/api/register").send({
      username: "testUser",
      password: "password123"
    });

    // Login the user and get token
    const res = await chai.request(server).post("/api/login").send({
      username: "testUser",
      password: "password123"
    });
    authToken = res.body.token;
  });

  describe("User Registration & Login", () => {
    it("should register a new user", (done) => {
      chai
        .request(server)
        .post("/api/register")
        .send({ username: "newUser", password: "newPass123" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message").eql("User registered successfully");
          done();
        });
    });

    it("should login an existing user and return a token", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({ username: "testUser", password: "password123" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
  });

  describe("Dog Management", () => {
    it("should register a new dog", (done) => {
      chai
        .request(server)
        .post("/api/dogs")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Rex",
          breed: "Golden Retriever",
          age: 3,
          description: "A friendly dog"
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("name").eql("Rex");
          res.body.should.have.property("breed").eql("Golden Retriever");
          dogId = res.body._id; // Save dog ID for next tests
          done();
        });
    });

    it("should list all available dogs", (done) => {
      chai
        .request(server)
        .get("/api/dogs")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.above(0);
          done();
        });
    });

    it("should adopt a dog", (done) => {
      chai
        .request(server)
        .post(`/api/dogs/${dogId}/adopt`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ adoptionMessage: "I love dogs!" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Thank you for adopting Rex!");
          done();
        });
    });

    it("should not adopt a dog already adopted", (done) => {
      chai
        .request(server)
        .post(`/api/dogs/${dogId}/adopt`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ adoptionMessage: "Trying to adopt again" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          done();
        });
    });

    it("should remove a dog (owned by user and not adopted)", (done) => {
      // Register another dog for removal test
      chai
        .request(server)
        .post("/api/dogs")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Buddy",
          breed: "Beagle",
          age: 2
        })
        .end((err, res) => {
          const newDogId = res.body._id;

          chai
            .request(server)
            .delete(`/api/dogs/${newDogId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").eql("Dog removed successfully");
              done();
            });
        });
    });

    it("should NOT remove a dog already adopted", (done) => {
      chai
        .request(server)
        .delete(`/api/dogs/${dogId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("error");
          done();
        });
    });
  });
});
