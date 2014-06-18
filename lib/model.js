// TABLES
/*
  Each table is represented by a document in the Tables collection:
    owner: user id
    name: String
    public: Boolean
    invited: Array of user id's that are invited (only if !public)
*/
Tables = new Meteor.Collection("tables");