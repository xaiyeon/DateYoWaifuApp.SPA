import { Photo } from './Photo';

export interface User {

    id: number;
    username: string;
    email?: string;
    profileImageURL: string;
    gender: string;
    ethnicity: string;
    age: number;
    knownAs: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city: string;
    country: string;
    dateCreated: Date;
    lastEdit: Date;
    lastActive: Date;
    photos?: Photo[];

}

// Straight from our API model

// public int Id { get; set; }
// public string Username { get; set;}
// public string Email { get; set;}
// public byte[] PasswordHash { get; set;}
// public byte[] PasswordSalt { get; set;}

// // Adding more properties
// public string ProfileImageURL { get; set;}

// public string Gender { get; set;}
// public string Ethnicity { get; set;}
// public DateTime DateOfBirth { get; set;}
// public string KnownAs { get; set;}
// public string Introduction { get; set;}
// public string LookingFor { get; set;}
// public string Interests {get; set;}
// public string City { get; set;}
// public string Country { get; set;}

// public DateTime DateCreated { get; set;}
// public DateTime LastEdit { get; set;}
// public DateTime LastActive { get; set;}

// // Don't use relationship collections in Dto 
// // This is a relationship, a one to many
// public ICollection<Photo> Photos { get; set;}