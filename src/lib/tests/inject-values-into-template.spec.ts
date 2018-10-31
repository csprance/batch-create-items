import injectValuesIntoTemplate from '../inject-values-into-template';

describe('extract-keys-from-text', () => {
  it('Injects correctly', () => {
    const csvStringMock = `NAME,ID
Frank,12
`;
    const templateStringMock = 'Test = $NAME$ Id="$ID$" $NAME$';
    const injected = injectValuesIntoTemplate(
      csvStringMock,
      templateStringMock
    );
    expect(injected).toEqual(['Test = Frank Id="12" Frank']);
  });

  it('Injects on a larger test', () => {
    const csvStringMock = `DESCRIPTION
Test
`;
    const templateStringMock = `<item name="$NAME$" class="Placeable" category="any">

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
    const injected = injectValuesIntoTemplate(
      csvStringMock,
      templateStringMock
    );
    expect(injected).toEqual([
      `<item name="$NAME$" class="Placeable" category="any">

	<params>
		<param name="selectable" value="0"/>
		<param name="mass" value="0.75"/>
		<param name="display_name" value="$DISPLAY_NAME$"/>
		<param name="description" value="Test"/>
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

</item>`
    ]);
  });

  it('Injects Multiple', () => {
    const csvStringMock = `NAME
Test
Test2
`;
    const templateStringMock = `$NAME$ - Yep`;
    const injected = injectValuesIntoTemplate(
      csvStringMock,
      templateStringMock
    );
    expect(injected).toEqual([`Test - Yep`, 'Test2 - Yep']);
  });
});
