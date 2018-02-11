export interface Photo {

    id: number;
    url: string;
    title: string;
    description?: string;
    dateUploaded: Date;
    lastEdited: Date;
    isMain: boolean;
    isCover: boolean;

}


// public int Id { get; set;}
// public string Url { get; set;}
// public string Title { get; set;}
// public string Description { get; set;}
// public DateTime DateUploaded { get; set;}
// public DateTime LastEdited { get; set;}
// public bool IsMain { get; set;}
// public bool IsCover { get; set;}

// public User User { get; set;}
// public int UserId { get; set;}

