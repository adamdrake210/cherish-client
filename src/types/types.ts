export type PersonType = {
  address: string;
  birthday: string;
  birthmonth: string;
  birthyear: string;
  email: string;
  firstName: string;
  lastName: string;
  links: Array<string>;
  notes: string;
  relationshiptype: string; // string ENUM
  userId: string;
};

export type Relation = {
  address: string;
  birthday: string;
  birthmonth: string;
  birthyear: string;
  email: string;
  firstName: string;
  lastName: string;
  links: Array<string>;
  notes: string;
  peopleId: string;
  relationshiptype: string; // string ENUM
  userId: string;
};
