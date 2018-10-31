import { extractKeys } from '../extract-keys-from-text';

describe('extract-keys-from-text', () => {
  it('gets the correct values from a mock', () => {
    const mockTest = `<item name="$NAME$" class="Placeable" category="any">

	<params>
		<param name="selectable" value="0"/>
		<param name="mass" value="0.75"/>
		<param name="display_name" value="$DISPLAY_NAME$"/>
		<param name="description" value="$DESCRIPTION$"/>
	</params>

	<base_part class="static" type="$ID$" name="$NAME$" max_health="1">
		<static filename="$CGF$"/>
	</base_part>

	<geometry>
		<thirdperson name="$CGF$"/>
	</geometry>

	<storage>
		<locations slots="1">
			<location category="any" slots="1"/>
		</locations>
	</storage>

</item>`;
    const values = extractKeys(mockTest);

    expect(values).toEqual([
      '$NAME$',
      '$DISPLAY_NAME$',
      '$DESCRIPTION$',
      '$ID$',
      '$CGF$'
    ]);
  });

  it('gets the correct values from a partial dollar sign match', () => {
    const mockTest = `<item name="$NAME$" class="Placeable" category="any">

	<params>
		<param name="selectable" value="0"/>
		<param name="mass" value="0.75"/>
		<param name="display_name" value="$DISPLAY_NAME$"/>
		<param name="description" value="$DESCRIPTIO"/>
	</params>

	<base_part class="static" type="$ID$" name="$NAME$" max_health="1">
		<static filename="$CGF$"/>
	</base_part>

	<geometry>
		<thirdperson name="$CGF$"/>
	</geometry>

	<storage>
		<locations slots="1">
			<location category="any" slots="1"/>
		</locations>
	</storage>

</item>`;
    const values = extractKeys(mockTest);

    expect(values).toEqual(['$NAME$', '$DISPLAY_NAME$', '$ID$', '$CGF$']);
  });

  it('gets the correct values from an empty string', () => {
    const mockTest = ``;
    const values = extractKeys(mockTest);

    expect(values).toEqual([]);
  });
});
