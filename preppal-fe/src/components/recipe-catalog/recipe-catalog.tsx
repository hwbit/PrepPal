import { Row, Col } from "react-bootstrap";
import RecipeCard from "../recipe-card/recipe-card";


const RecipeCatalog = (recipes: any) => {
    const catalog: any[] = recipes.catalog ?? [];
    return (<Row xs="auto" md="auto" lg="auto">
        {catalog.map((entry) => (
            <Col key={entry._id}>
                {RecipeCard(entry)}
            </Col>
        ))}
    </Row>);
}

export default RecipeCatalog