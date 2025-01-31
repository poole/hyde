---
layout: post
title: Testing dbt data transformations, including dbt-expectations.
---

<i> The post gives a summary of the different types of data tests that can be applied to a data transformation project, including the use of dbt-expectations. The content is based on a [dbt bootcamp course](#dbt_bootcamp), with examples and explanations as to what's being tested and how. The examples are available in Github:
</i>

[dbt complete bootcamp repo](https://github.com/dp2020-dev/completeDbtBootcamp){:target="\_blank"}

### Why data testing?

From my experience with data transformation projects in the past (e.g. moving data from on prem to the Azure cloud) I'm aware of the challenges of ensuring the quality of data taken from multiple sources into target tables, the transformations at each stage and maintaining this quality continuously in a CI/CD delivery. This complexity makes manual testing onerous (especially given the transformations are likely to be part of an automated pipeline), with an underlying risk that errors in the end data can erode the user's confidence in the data being consumed.

Given this context, being able to create efficient, discrete scripted tests at the key stages of a data pipeline using sql and built in dbt tests are a powerful, efficient way to ensure data quality throughout a data transformation project. [Great Expectations.io](https://greatexpectations.io/) and the dbt-specific version [dbt-expectations](https://github.com/calogica/dbt-expectations) offer a user friendly framework to further extend test coverage.

![Great Expectations logo, December 2024](/images/gx_logo_horiz_color.png)

To see these test tools (dbt tests, gbt-expectations and custom sql tests) in action the following Udemy 'bootcamp' course was an excellent introduction to dbt and its test tools, and the screenshots and material in this post are based on this course:

<a id="dbt_bootcamp"></a>
[The Complete dbt (Data Build Tool) Bootcamp:](https://www.udemy.com/course/complete-dbt-data-build-tool-bootcamp-zero-to-hero-learn-dbt) ![dbt bootcamp](/images/dbtHeroUdemy.png)

The boot camp covers the theory and practical application of a data project using snowflake as the data warehouse, and the open source version of dbt. What was particularly relevant for a tester are the sections covering testing which include [dbt expectations](https://hub.getdbt.com/calogica/dbt_expectations/latest/).

The following section covers examples and explanations of what these 3 types of tests can do, using the boot camp project as [an example:](https://github.com/dp2020-dev/completeDbtBootcamp){:target="\_blank"}

### Built-in dbt Tests:

<ul>
<li>not_null: Ensures that the column doesn't contain null values.</li>
<li>unique: Verifies that all values in the column are distinct.</li>
<li>relationships: Checks if a foreign key relationship exists between two columns in different models.</li>
<li>accepted_values: Ensures that the column only contains specific values from a predefined list.</li>
<li>positive_value:</b> Verifies that the column values are positive numbers.</li>
</ul>

### Built-in dbt-expectations Tests:

#### What is dbt-expectations?

dbt-expectations is an open source python package for dbt based on Great Expectations, and enables integrated tests in data warehouses supported by dbt.

This allows us to extend the coverage of the dbt core (i.e. the built in tests) using a range of tests within the package. The examples below include the built in tests, dbt-expectations tests and custom sql tests (effectively macros). These tests are written in the schema.yml file as per this example in [the schema file](https://github.com/dp2020-dev/completeDbtBootcamp/blob/main/models/schema.yml).

<ul>
<li>dbt_expectations. expect_table_row_count_to_equal_other_table: Compares the row count of two tables.</li>

<li>dbt_expectations.expect_column_values_to_be_of_type: Checks the data type of a column.</li>
<a id="quantile_test"></a> <li>dbt_expectations.expect_column_quantile_values_to_be_between: Verifies that quantile values fall within a specific range.</li>
<li>dbt_expectations.expect_column_max_to_be_between: Ensures that the maximum value of a column is within a certain range.</li><br>
</ul>
#### Example dbt-expectations test:<br>

To apply dbt expectation tests, the code is added to the schema.yml file
, in the example below its used to check column type, expected values (including the quantile value to check values in the table are in an expected range), and a max value. We can also set if a failing test is a warning or an error.

![Great Expectations logo, December 2024](/images/dbtExpectSampleTests.png)

### Built-in custom sql Tests:

The third type of dbt test used in this project is a <b>custom sql test</b>.

This simple sql custom test checks the 'dim_listings_cleansed' table for any listings with < 1 night.

![Custom sql example- min nights](/images/dim_listings_min_nights.png)

Custom tests sit outside the dbt core and dbt-expectations tests and can
extend test coverage to cover edge cases. They are also flexible in enabling ad hoc testing to investigate
scenarios, or to be part of the CI/CD pipeline- see an example of how we can trace the `dim_listings_min_nights` custom rest on the data lineage graph in the [lineage graph section.](#dag_lineage)

## Debugging<br>

For the basic commands on debugging etc. see [About dbt debug command](https://docs.getdbt.com/reference/commands/debug).

Running `dbt test --debug` command will run all the sql tests against the database connections, the console logs all the test names and the results. However to dig into why a given test failed,
its possible to run the actual sql test against the source table (e.g. in this project in Snowflake) and simplifying the test code to find exactly where it failed- a good approach for a complex failure.

## Lineage Graph (Data Flow DAG)<br>

In the section above we've looked at practical tests in dbt-expectations which can be embedded in the data transformation pipeline. These tests can be included on a really useful dbt feature, the 'lineage graph' alongside the source tables, dimension, fact tables etc. to show where and when the tests run, what table it relates to etc.

<a id="dag_lineage"></a>

![dbt lineage graph](/images/dbt-dag-3.png)

Provided test in question is included in the schema.yml and has a description value, it will be included in the correct part of the data transformation flow.

For example, the lineage graph below shows the flow of data in our data warehouse, for instance we can see at a glance that `dim_listings_cleansed` is a cleansed dimension table based on the `src_listings table`.

![dbt lineage graph right click](/images/lineage_right_click.png)

By right clicking and checking documentation for `dim_listings_cleansed`, we can check all the tests in place for this stage of the transformation, for instance we can tell the the `room_type` test checks the type of room as per the description.

![dbt docs](/images/docs_room_type_test.png)

For reference the test itself is a built in test in the [schema.yml](https://github.com/dp2020-dev/completeDbtBootcamp/blob/ebd7310c905f63a124e43aee2725aeab9a00f8d9/models/schema.yml#L21), and while the schema clearly lists all tests its great to be able to visualise where exactly this test sits in the data pipeline, what table(s) it references and we're able to click through to read its description and code via the graph. In a data transformation with many sources/transformations this tool would be invaluable.

# Summary

The different types of test tools used in this project has demonstrated how a tester can add value to a data transformation project. Firstly, the [dbt core](#[Built-in dbt Tests:]) tests are simple, efficient sql tests at key stages of the data pipelines gives us assurance as the data is ingested and transformed at each stage.

[Dbt-expectations](#[Built-in dbt-expectations Tests:]) allows us to extend the test coverage by enabling more advanced validations like expected percentiles, ranges, and more complex rules. For example the boot camp uses the [expect_column_quantile_values_to_be_between](quantile_test) test to flag a warning if a value in the top 1% of prices for a listing is outside a given range. This is a check for anomalies in the data based on our use case, dbt-Expectations in particular would be useful from a QA perspective- in collaboration with the end user/stakeholder a tester could start thinking of qualitative tests.

Finally, while not strictly speaking a tets tool/feature, I expect a tester would find the [dag diagrams](dag_lineage) a really useful tool to keep track of what data is ingested where, how its transformed and which tests are applied to it.

I found there was some overhead to setting up the project structure so that the yaml picked up the right references, and that each of the 3 different types of tests were configured properly, but once up and running I was able to add more tests and extend test coverage. I started thinking of more potential validation tests using dbt expectations, so again these tools would empower a tester to work with the project/stakeholders to really start applying quality assurance not just to the data transformation itself but how its used by the stakeholders.
