import PersonForm from '@/components/Forms/PersonForm';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddPersonForm from '../../components/Forms/AddPersonForm';
import AddRelationshipForm from '../../components/Forms/AddRelationshipForm';

export default function AddPerson() {
  const [success, setSuccess] = useState(false);
  const [isAddRelationship, setIsAddRelationship] = useState(false);
  const [personId, setPersonId] = useState('');

  return (
    <div className="container">
      <div>
        <Typography component="h1" variant="h4" color="primary" gutterBottom>
          Add Person
        </Typography>
        <AddPersonForm />
        {/* <PersonForm /> */}
      </div>
      {/* {success && (
        <div>
          {isAddRelationship && (
            <>
              <h2>Add Relationship</h2>
              {isAddRelationship && (
                <button
                  type="button"
                  className="button button-sm button-white"
                  onClick={() => setIsAddRelationship(!isAddRelationship)}
                >
                  Cancel
                </button>
              )}
              <AddRelationshipForm
                personId={personId}
                setIsAddRelationship={setIsAddRelationship}
              />
            </>
          )}

          {!isAddRelationship && (
            <Button
              type="button"
              className="button button-lg button-blue m-t-20"
              onClick={() => setIsAddRelationship(!isAddRelationship)}
            >
              Add Relationship
            </Button>
          )}
        </div>
      )} */}
    </div>
  );
}
