# OAG Depository of Law

Status: Not started

# Project Brief

Client: Office of the attorney General

Vendor: SegmentX Private Limited

domain: www.legislation.gov.bt

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
      amendments:Amendment[];
      legislationRelationships:LegislaitonRelationship[];
    
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
        interface DocumentCopy{
        	language: Enum("Dzongkhag", "English", "Bilingual");
        	amendment?:Amendment;
          legislation?:Legislaiton;
          delegatedLegislation?:DelegatedLegislation;
          parentDocument?:ParentDocument;
          fileUri?: string;
        }
        ```
        
        LanguageType = English, Dzongkha or Bilingual
        
        Type ⇒ Document Type - Legislation,DelegatedLegislation, Amendment and ParentDocument
        
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
      status: DelegatedLegislationStatus;
      
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
      delegatedLegislationRelationships:DelegatedLegislaitonRelationship[];
     
    }
    ```
    
- Earlier Delegated legislations had similar status to the legislations i.e enacted,bill,ammended, repealed. however there are some differences and the status has been changed as follows:
    
    ```tsx
    enum DelegatedLegislationStatus {
      ENACTED = 'ENACTED',
      REVOKED = 'REVOKED',
      MODIFIED = 'MODIFIED',
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
    	date:Date;
    	type: Enum('Executive Order', 'Circular','Office Order')
    	fileUri:string
    }
    ```
    

It will have one of the   following status

- Current: enacted delegated legislations
- Modified: Amendment to a Current DL
- Revoked: Repealed Delegated Legislations

## Sections

A section will hold the content of the legislative document, be it legislation, delegated Legislation or an Amendments/Modifications and is defined as follows:

```tsx
 interface Section {
  order: number;
  type: SectionType;
  content_eng: string;
  content_dzo: string;
  legislationId?: number;
  delegatedLegislationId?: number;
  amendmentId?:number;
}
```

Although Section is used when referring to Legislation and Clause when referring to Delegated Legislations, the system will use Section to refer to both section as well as clause.

It will have content in english and Dzongkha. It will have the following types and it not only defines what type a section/clause is but also is used for formatting when displaying on the webpage. 

```tsx
enum SectionType {
  HEADING_1 = 'HEADING_1',
  HEADING_2 = 'HEADING_2',
  HEADING_3 = 'HEADING_3',
  SUBSECTION_H1 = 'SUBSECTION_H1',
  SUBSECTION_H2 = 'SUBSECTION_H2',
  CLAUSE = 'CLAUSE',
}
```

The Section Type for the purpose for usage and understanding is further remapped into the following terms when presenting it in the admin interface.

- HEADING_1 ⇒ Chapter Number
- HEADING_2 ⇒ Chapter Name
- SUBSECTION_H1 ⇒ Section Heading
- CLAUSE ⇒ Section

# Change Tracking - Amendment, Repeal and Insertion of Sections/Clause

---

## Amendments

It will have same structure as a legislative Document as defined below:

```tsx
interface Amendment {

	legislation:Legislation;
	delegatedLegislation:DelegatedLegislation;
	
  title_eng: string;
  title_dzo: string;
  
  documentYear: string;

  status: AmendmentStatus;
  
  isPublished: boolean;
  isActive: boolean;
  
  enactmentDate?: string;
  commencementDate?: string;
  repealDate?: string;
  
  documentCopies:DocumentCopy[];  
  sections:Section[];
	
}
```

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

## Repeal/ Revoke

To achieve both grouping all related legislation together and finding the relationship amongst the legislation (such as superseding relationships) following two entities are used:

- **LegislationGroups/DelegatedLegislationGroup**:It allows for logically grouping related legislations together. This proves useful in organizing legislations that are part of the same legislative history or that are related in some way.
    
    it is defined as below:
    
    ```tsx
    interface LegislationGroup {
      name: string;
      remarks:string;
    }
    ```
    
- **LegislationRelationships/DelegatedLegislationRelationship**: It will map the relationships amongst legislations. Actor,Action and ActedUpon is used to model the relationship. Currenly it caters to only supersede/repeal/revoke and  consolidate action type.
    
    ```tsx
    interface LegislationRelationships {
    	actingLegislation:Legislation;
    	action:Enum("Repeals","Consolidates");
    	affectedLegislation:Legislation;
    }
    
    interface DelegatedLegislationRelationships {
    	actingDelegatedLegislation:DelegatedLegislation;
    	action:Enum("Revokes","Consolidates");
    	affectedDelegatedLegislation:DelegatedLegislation;
    }
    ```
    

Taking the Local Government Act,  The first is the "Local Government Act 2007" which has been repealed. The second is the "Local Government Act 2009" which is currently enacted and supersedes the 2007 Act. The third is the "Local Government Amendment Act 2014" which is enacted and amends the 2009 Act. These three pieces of legislation belong to the same group, indicating they are part of the same legislative history. In the software model, this relationship would be maintained using the `LegislationGroups` entity to group these related legislations together. The `LegislationRelationships` entity would capture the supersession and amendment relationship would be captured by the Amendments Entity.

# Search Functions

- Search by keyword in title or content (Chapter Name, Section Header) by Legislation,Delegated Legisaltion and Amendments

## Case study: Local government Act

Add Legislation LG ACT 2007 

Add Thromde Act 2007

Add LG ACT 2009 under  the same legislation Group via Adding a version in the Legislative Version

LG Act 2009 supersedes LG Act 2007 

→ Define a new LegislationRelationship

- actingLegislation = LG Act 2009
- action = repeals
- affectedLegislation = LG Act 2007

Change status of LG Act 2007 to repealed and add the repeal date based on the superseding legislation 

LG Act 2009 is further amended by the LG Amendment ACT 2014

**under Legislative History → Add an Amendment to the LG Act 2009**

> amendedLegislation:Legislation;
amendedDelegatedLegislation:null;
title_eng: LG Amendment Act 2014;  
 documentYear: 2014;
 status: Enacted;
 isPublished: True;
  sActive: True;
  enactmentDate?: 2014;
  commencementDate?: 2014;
  repealDate?: null;
> 

public interface

1. Clicks on LG Act 2007
    1. status is repealed, and i want to know what act repealed it.
        1. Query the LegislationRelationship 
        2. Where type = ‘Repeals’ and affectedLegislation = LG Act 2007
        3. get the acting legislation Details and show repealed date = acting Legislation enactment Date
2. Clicks on LG Act 2009
    1. status is enacted but i want to know its history
        1. so i query the legislative group and get all the versions
        2. Relationships
            1. LegislationRelationships: It has two relations
                1. LG Act 2009  repeals LG Act 2007
                2. LG Act 2009 repeals Thromde Act 2007
            2. Amendments:
                1. LG Act Amendment  2014
                    1. can list all change and change values and its revisions can be seen in the sections of LG Act 2009
                    2. can be viewed separately
    
    **Future Scenario**
    
    1. Repealed? easy same procedure
    2. New amendment 2016 is there
        1. Add another amendment under the LG ACt 2009
            1. Amend the necessary sections
    3. when clikcing the LG Act 2009 now it will have two amendments
        1. Amendment Act 2014
        2. Amendment Act 2016
    
    Lacking? : Showing the unmodified version of the Act
    
    - Before 2016 but with 2014
    - without 2016 and 2014
    
    # todo
    
    - Document Copy Module
        - update integration with both L and DL
        - get document copy routes
    - Amendments
        - workflow
            - sections
            - document copy
            - Amends table
    -