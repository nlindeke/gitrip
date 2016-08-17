var Color = require("color")

var primary = Color("#fff");
var secondary = Color("#eee");
var sidebar = Color("#eee");
var shadow = Color("666");

var darken = primary.darken(0.2).hexString().toString();

module.exports = {
	brandPrimary : primary.hexString().toString(),
	brandSecondary: secondary.hexString().toString(),
	brandSidebar: sidebar.hexString().toString(),
	brandshadow: sidebar.hexString().toString()
}