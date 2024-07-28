<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="2.0"
		xmlns:html="http://www.w3.org/TR/REC-html40"
		xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>XML Sitemap</title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<style type="text/css">
				body {
					font-family: Helvetica, Arial, sans-serif;
					font-size: 14px;
					color: #005f6f;
				}
				table {
					border: none;
					border-collapse: collapse;
				}
				#sitemap tr td {
					padding:10px
				}
				#sitemap tr:nth-child(odd) td {
					background-color: #e6edef !important;
				}
				#sitemap tbody tr:hover td {
					background-color: #e1f1f6 !important;
				}
				
				#content {
					margin: 0 auto;
					width: 1000px;
					display:grid;
					justify-content:between;
					align-items:center;
					gap:0
				}
				.expl {
					margin: 18px 3px;
					line-height: 1.2em;
				}
                h1 {
                    color:#000;
                }
				
				a {
					color: #9f0202;
					text-decoration: none;
				}
				a:visited {
					color: #4c7282;
				}
				a:hover {
					text-decoration: underline;
				}
				td {
					font-size:15px;
				}
				th {
					text-align:left;
					padding-right:30px;
					font-size:18px;
				}
				thead th {
					border-bottom: 1px solid #bcdfe6;
				}
			</style>
		</head>
		<body>
		<div id="content">
			<h1>
			<span>
			XML Sitemap
			</span>
			</h1>
			<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
				<p class="expl">
					This XML Sitemap Index file contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
				</p>
				<table id="sitemap" cellpadding="3">
					<thead>
					<tr>
						<th width="75%">Sitemap</th>
						<th width="25%">Last Modified</th>
					</tr>
					</thead>
					<tbody>
					<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
						<xsl:variable name="sitemapURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<tr>
							<td>
								<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
							</td>
							<td>
								<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
							</td>
						</tr>
					</xsl:for-each>
					</tbody>
				</table>
			</xsl:if>
			<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
				<p class="expl">
					This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
				</p>
				<table id="sitemap" cellpadding="3">
					<thead>
					<tr>
						<th width="80%">URL</th>
						<th title="Last Modification Time" width="15%">Last Mod.</th>
					</tr>
					</thead>
					<tbody>
					<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
					<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
					<xsl:for-each select="sitemap:urlset/sitemap:url">
						<tr>
							<td>
								<xsl:variable name="itemURL">
									<xsl:value-of select="sitemap:loc"/>
								</xsl:variable>
								<a href="{$itemURL}">
									<xsl:value-of select="sitemap:loc"/>
								</a>
							</td>
							
							<td>
								<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
							</td>
						</tr>
					</xsl:for-each>
					</tbody>
				</table>
			</xsl:if>
		</div>
		</body>
		</html>
	</xsl:template>
	</xsl:stylesheet>
