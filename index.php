<?php
/* Example : Using manifest.json for return the corrects url for css and js files */
function asset($asset_name)
{
    $manifest = file_get_contents("./dist/manifest.json");
    $manifest = json_decode($manifest, true); //decode json string to php associative array
    if (!isset($manifest[$asset_name])) return $asset_name; //if manifest.json doesn't contain $asset_name then return $asset_name itself
    return $manifest[$asset_name];
}
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <title>Webpack Boilerplate</title>
    <link rel="stylesheet" href="<?php echo asset('main.css'); ?>" type="text/css" media="all">
</head>
<body>



<script type="text/javascript" src="<?php echo asset('main.js'); ?>"></script>
</body>
</html>