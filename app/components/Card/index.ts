import { Card } from "./Card";
import { CardActions } from "./CardActions";
import { CardImage } from "./CardImage";
import { CardTitle } from "./CardTitle";

export default Object.assign(Card, {
  Title: CardTitle,
  Actions: CardActions,
  Image: CardImage,
});
