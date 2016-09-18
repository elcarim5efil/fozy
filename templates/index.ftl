<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
</head>
<body>
    <ul>
        <#list pages as page>
        <li><a href="${page.url}">${page.name} - ${page.url}</a></li>
        </#list>
    </ul>
</body>
</html>