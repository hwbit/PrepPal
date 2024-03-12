import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './filter-menu.css';

interface FilterMenuProps {
  showFilterMenu: boolean;
  handleClose: () => void;
}

export interface FilterValues {
  [key: string]: string | number | null;
  title: string | null;
  author: string;
  description: string;
  ingredients: string;
  cookingTime: number;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ showFilterMenu, handleClose }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterData, setFilterValues] = React.useState<FilterValues>({
    title: "", // searchParams.has("title") ? searchParams.get("title") : "",
    author: "",
    description: "",
    ingredients: "",
    cookingTime: 0,
  });

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    setFilterValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    };

  const handleSubmit = () => {
    let filterQuery = "?";
    for (const filter in filterData) {
      if (filterData[filter]) {
        if (filterQuery !== "?") filterQuery += "&";
        // @ts-expect-error
        filterQuery += `${filter}=${encodeURIComponent(filterData[filter])}`;
      }
    }
    handleClose();
    navigate(`/search${filterQuery}`);
  };

  return (
    <Modal show={showFilterMenu} onHide={handleClose}>
      <Modal.Header closeButton className="filter-menu-header">
        <Modal.Title>Filter Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label className="filter-label">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by title"
              value={filterData.title ? filterData.title : ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label className="filter-label">Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by author username"
              value={filterData.author}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label className="filter-label">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by description"
              value={filterData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="ingredients">
            <Form.Label className="filter-label">Ingredients</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by ingredients (comma separated)"
              value={filterData.ingredients}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="cookingTime">
            <Form.Label className="filter-label">Cooking Time</Form.Label>
            <Form.Control
              type="number"
              placeholder="Filter by (maximum) cooking time (minutes)"
              value={filterData.cookingTime > 0 ? filterData.cookingTime : ""}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="submit-filters" variant="primary" onClick={handleSubmit}>
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
