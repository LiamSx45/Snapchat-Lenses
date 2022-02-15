// -----JS CODE-----
// @input SceneObject[] obj
var count = 0;
script.obj[0].enabled = true;
for (var i = 1; i < script.obj.length; i++)
{
script.obj[i].enabled = false;
}
function onTapped(eventData)
{
count++


for (var i = 0; i < script.obj.length; i++)
{
if (count == i)
{
script.obj[i].enabled = true;
}
else
{
script.obj[i].enabled = false;
}
}


if (count == script.obj.length)
{
count = 0;
script.obj[0].enabled = true;
}
}
var event = script.createEvent("TapEvent");
event.bind(onTapped);
