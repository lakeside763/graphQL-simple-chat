# graphQL-simple-chat
graphQl simple chat

mutation {
  signUp(
    email: "smith123@yahoo.com", 
    password: "password10",
    name: "Smith"
    username: "smith123"
  ) {
    id, name, email, password, username
  }
}

mutation {
  signIn(
    email: "smith123@yahoo.com", 
    password: "password10",
  ) {
    id, name, email, password, username
  }
}

mutation {
  signOut
}

mutation {
  startChat(title: "Intro to GraphQL", userIds: ["5f18412050b1bb44b08f1ac6"]) {
    id, title
  }
}

{
  me {
    id
    name,
    username,
    email
  }
}

{
  users {
    id, name, username, email, createdAt, updatedAt
    chats {
      id
      users {
        id, name, email
      },
      lastMessage {
        id, 
      },
      messages {
        id, 
      }
    }
  }
}