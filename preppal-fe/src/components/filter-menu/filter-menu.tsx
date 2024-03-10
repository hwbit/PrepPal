import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './filter-menu.css';

interface FilterMenuProps {
    showFilterMenu: boolean;
    handleClose: () => void;
    titleQuery: string | undefined;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ showFilterMenu, handleClose, titleQuery }) => {
  // TODO filter options and logic

  return (
    <Modal show={showFilterMenu} onHide={handleClose}>
      <Modal.Header closeButton className="filter-menu-header">
        <Modal.Title>Filter Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filterTitle">
            <Form.Label className="filter-label">Title</Form.Label>
            <Form.Control type="text" placeholder="Filter by title" value={titleQuery ? titleQuery : ""} />
          </Form.Group>

          <Form.Group controlId="filterAuthor">
            <Form.Label className="filter-label">Author</Form.Label>
            <Form.Control type="text" placeholder="Filter by author username" />
          </Form.Group>

          <Form.Group controlId="filterDescription">
            <Form.Label className="filter-label">Description</Form.Label>
            <Form.Control type="text" placeholder="Filter by description" />
          </Form.Group>

          <Form.Group controlId="filterIngredients">
            <Form.Label className="filter-label">Ingredients</Form.Label>
            <Form.Control type="text" placeholder="Filter by ingredients (comma separated)" />
          </Form.Group>

          <Form.Group controlId="filterCookingTime">
            <Form.Label className="filter-label">Cooking Time</Form.Label>
            <Form.Control type="number" placeholder="Filter by (maximum) cooking time (minutes)" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="submit-filters" variant="primary" onClick={handleClose}>
          Apply Filters
        </Button>
        <Button  className="close-filters" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterMenu;
