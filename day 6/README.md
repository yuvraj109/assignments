# Project Management Dashboard

A simple and intuitive project management dashboard built with React, Redux Toolkit, and TypeScript.

## Usage

### Navigation
The application features a simple navigation bar with three sections:
- **Projects**: Manage projects and assign teams
- **Teams**: Create teams and add members
- **Members**: Add and manage individual members

### Workflow
1. **Start with Members**: Create members with their details
2. **Create Teams**: Form teams and assign members to them
3. **Setup Projects**: Create projects and assign teams to them

### Data Relationships
- **Members** can be assigned to multiple **Teams**
- **Teams** can be assigned to multiple **Projects**
- **Projects** can have multiple **Teams**

## Redux Store Structure

```typescript
{
  project: {
    projects: [
      {
        id: number,
        name: string,
        teams: [{ id: number, name: string }]
      }
    ]
  },
  team: {
    teams: [
      {
        id: number,
        name: string,
        members: [{ id: number, name: string }]
      }
    ]
  },
  member: {
    members: [
      {
        id: number,
        name: string,
        age: string,
        position: string
      }
    ]
  }
}
```