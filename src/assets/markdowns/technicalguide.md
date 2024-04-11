
# Project Brief

Project Title: Development of Depository of Laws Website

Client: Office of the attorney General

domain: www.legislation.gov.bt

vendor: SegmentX Private Limited

# Entities and Relationship

---

## Legislation

- A legislation is defined as below:
    
    ```tsx
    interface LegislationDto {
      title_eng: string;
      title_dzo: string;
      type: LegislationType;
      status: LegislationStatus;
      isPublished: boolean;
      isActive: boolean;
      documentYear: string;
      tabledDate?: string;
      enactmentDate?: string;
      amendmentDate?: string;
      repealDate?: string;
      
      documentCopies:DocumentCopy[];
      delegatedLegislations:DelegatedLegislation[];
      
      sections:Section[];
      amendments:Amendment[]
    }
    ```
    

Definitions

- Title: title in english and Dzongkha
- LegislationType : A Legislation can be categorized into two types: Acts and Conventions
- LegislationStatus : Enacted, Bill, Repealed,Amended
    
    Acts: An Act will have one of the following status:
    
    - Enacted - Current Acts
    - Repealed: Repealed Acts
    - Bill: Bills
    
    International Conventions:
    
    - Enacted: Current International Conventions
- Dates:
    - Enactment Date: The enactment date of legislation refers to the date when the legislation is formally made into law by its signing by the relevant authority.
    - Commencement Date:  On the other hand, the commencement date is the date when the law actually comes into effect and begins to be enforced.
    - Repeal Date: The date on which the current legislation is superseded by another legislation
- Document Copy: A legislation will have document copies in either English, Dzongkha or Bilingual Format
    - A Document copy is defined as below:
        
        ```tsx
        interface DocumentCopy {
          fileUri?: string;
          language: LanguageType;
          type: string;
          status: string;
          refId: string;
        }
        ```
        
        LanguageType = English, Dzongkha or Bilingual
        
        Type ⇒ Document Type - Legislation,DelegatedLegislation, Amendment or ParentDocument
        
- A legislation will have many Delegated Legislations
- A legislation will have many amendments - an amendment will amend a legislation and as such have many other details that enable change trackings and history keeping

## Delegated Legislation

- A delegated legislation is subsidiary to a Parent Legislation and is defined as below:
    
    ```tsx
    interface DelegatedLegislationDto {
    	parentLegislation: Legislation;
    	parentDocument:ParentDocument;
    	
      title_eng: string;
      title_dzo: string;
      documentYear: string;
    
      type: LegislationType;
      status: LegislationStatus;
      
      isPublished: boolean;
      isActive: boolean;
      
      tabledDate?: string;
      enactmentDate?: string;
      amendmentDate?: string;
      repealDate?: string;
      
      documentCopies:DocumentCopy[];
      delegatedLegislations:DelegatedLegislation[];
      
      sections:Section[];
      amendments:Amendment[];
      
      
    }
    ```
    
- All Delegated Legislations may not have a parent Legislation document and in that case will have one of the following parentDocument
    - Executive order
    - circular
    - office order
    
    - A delegated legislation may not have both parent Legislation and a parent Document.
    
    A **parent document** is defined as below:
    
    ```tsx
    interface ParentDocument{
    	delegatedLegislation:DelegatedLegislation;
    	title_eng:string;
    	title_dzo:string;
    	type: Enum('Executive Order', 'Circular','Office Order')
    	fileUri:string
    }
    ```
    

It will have one of the   following status

- Current: enacted delegated legislations
- Modified: Amendment to a Current DL
- Revoked: Repealed Delegated Legislations

## Sections

A section will hold the content of the legislative document.

It will have content in english and dzongkhag

it will have a type of the following

- Chapter Number
- Chapter Name
- Section Heading
- Section

These types not only defines what type a section/clause is but also is used for formatting when displaying. 

However these has been redefined as follows to cater for any future requirements;

```tsx
export enum SectionType {
  HEADING_1 = 'HEADING_1',
  HEADING_2 = 'HEADING_2',
  HEADING_3 = 'HEADING_3',
  SUBSECTION_H1 = 'SUBSECTION_H1',
  SUBSECTION_H2 = 'SUBSECTION_H2',
  CLAUSE = 'CLAUSE',
}
```

The mapping is as follows:

- Chapter Number = HEADING_1
- Chapter Name = HEADING_2
- Section Heading= SUBSECTION_H1
- Section = CLAUSE

# Amendments and Tracking Changes

---

## Amendments

It will have same structure as a legislative Document

It will have an additional attribute amendedLegislationId and amendedDelegatedLegislationId

These two fields will identify whether the amendment amends a legislation or modifies a delegated legislation

It will have **Change**  which can be of the following one type:

- CREATION  - when a new section is created at the end of the document/ at the end
- DELETION  - When a section is repealed, the change is termed as deletion.
- MODIFICATION  - when a section is amended, the change is termed as modification
- INSERTION  - when a new section is inserted in between existing sections, it is termed as insertion.

A **Change** has many **Change Value** to track what is changed

- Attribute - which attribute of the section is changed
- old value - existing value of the changed section Attribute
- new Value - new Value of the changed section attribute

A change type is displayed to public with following labels

- Creation - ‘In this Act, New Section after Section No is inserted as ${newValue}’
- Deletion - ‘In the Act, Section No is repealed’
- Modification - ‘In the Act, Section 205 is amended as: ${newValue}’

# Workflow in adding a Legislation

---

in addition to the above core attributes, it has two additional attributes namely **isActive** and  **isPublished.**

- A document is in draft if it  !isPublished  and !isActive
- A document is published when all details are added and the is Published and isActive.