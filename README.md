# Mini Page Builder

A mini page builder which lets the user drag and drop components from the sidebar.

## Instructions to run the code

- Download zip or clone this repository.
- Once code is downloaded do `yarn` to install all the necessary dependencies.
- Do `yarn run dev` inside project directory to start the application.
- The application will start on [http://localhost:3000](http://localhost:3000)

## Layout

- The app consists of two sections `DropArea` and `Sidebar`.
  - `DropArea`: The area where the user can drop the selected elements.
  - `Sidebar`: The area where the user can find the draggable elements available to be dropped in `DropArea`. There are also buttons to export the current page configuration to a JSON file. User can also import a page configuration of their choice.
- The layout is responsive so user can do the same in a mobile view as well.

## Functionality

- **Adding elements:**

  - There are 3 elements namely `Label`, `Input` and `Button` available to be dropped into the drop area.
  - **Web view:** User can click on any element and drag the element to drop area.
  - **Mobile view:** User can select element type by touching on the element. Selected element will get darken, then user can touch on the point where user wants to place the element.
  - Upon dropping the elements on drop area an element config modal will open up with the coordinates already filled.

- **Selecting elements:**

  - User can select one element at a time.
  - User can select the element by either clicking on it or tapping on it once.

- **Moving elements:**

  - **Web view:** User can click and drag the elements.
  - **Mobile view:** User can touch and drag the elements.
  - Upon dragging the element to their final position, the modal will again open up with the updated coordinates.

- **Removing elements:**

  - User can select the element and press `Delete` to delete the selected element.

- **Updating elements:**

  - User can select the element and press `Enter` to open the modal again and change the element configuration.
  - User can double tap on the element in mobile view to open the modal.

- **Configuring elements:**

  - User can change the configuration of selected element from the Modal.
  - User gets options such as:
    - Changing element text
    - Changing element coordinates
    - Changing `font size` and `font weight`
  - User needs to save the changes by clicking on `Save Changes` button in the modal to be able to see the changes.

- **Exporting page configuration:**

  - User can export the current page configuration by clicking on `Export` button.
  - Clicking on the `Export` button will save the current configuration in JSON format.
  - A JSON file will get downloaded.

- **Importing page configuration:**

  - User can import any page configuration by clicking on the `Import` button.
  - User needs to follow the following JSON format before importing the file to get the desired outcome.

  ```
  [
    {
        "id": "2023-12-21T18", // any unique ID
        "type": "button", // element type
        "isNew": false,
        "x": 168,
        "y": 96,
        "className": "",
        "isDragging": false,
        "text": "",
        "fontSize": "",
        "fontWeight": ""
    }
  ]
  ```
