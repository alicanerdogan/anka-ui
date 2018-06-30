declare module "*.png";
declare module "*.svg";
declare module "*.jpg";

declare module "*.json" {
  const value: any;
  export default value;
}
