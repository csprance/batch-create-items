import { xmlToCsvHeader } from '../lib/extract-keys-from-text';

export const defaultValueXML = `<item name="$NAME$" class="Placeable" category="any">

	<params>
		<param name="selectable" value="0"/>
		<param name="mass" value="$MASS$"/>
		<param name="display_name" value="$DISPLAYNAME$"/>
		<param name="description" value="$DESCRIPTION$"/>
	</params>

	<base_part class="static" type="$ID$" name="$NAME$" max_health="$MAXHEALTH$">
		<static filename="$CGF$"/>
	</base_part>

	<geometry>
		<thirdperson name="$CGFTP$"/>
	</geometry>

	<storage>
		<locations slots="1">
			<location category="any" slots="1"/>
		</locations>
	</storage>
</item>`;

export const defaultValueCSV = `${xmlToCsvHeader(defaultValueXML)}
`;
